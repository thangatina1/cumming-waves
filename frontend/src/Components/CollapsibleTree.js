import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import '../Styles/CollapsibleTree.css';

// 4-layer sample data inspired by Observable D3 Collapsible Tree
const data = {
  name: "flare",
  children: [
    {
      name: "analytics",
      children: [
        {
          name: "cluster",
          children: [
            { name: "AgglomerativeCluster" },
            { name: "CommunityStructure" },
            { name: "HierarchicalCluster" },
            { name: "MergeEdge" }
          ]
        },
        {
          name: "graph",
          children: [
            { name: "BetweennessCentrality" },
            { name: "LinkDistance" },
            { name: "MaxFlowMinCut" },
            { name: "ShortestPaths" },
            { name: "SpanningTree" }
          ]
        },
        {
          name: "optimization",
          children: [
            { name: "AspectRatioBanker" }
          ]
        }
      ]
    },
    {
      name: "animate",
      children: [
        { name: "Easing" },
        { name: "FunctionSequence" },
        {
          name: "interpolate",
          children: [
            { name: "ArrayInterpolator" },
            { name: "ColorInterpolator" },
            { name: "DateInterpolator" },
            { name: "Interpolator" },
            { name: "MatrixInterpolator" },
            { name: "NumberInterpolator" },
            { name: "ObjectInterpolator" },
            { name: "PointInterpolator" },
            { name: "RectangleInterpolator" }
          ]
        },
        { name: "ISchedulable" },
        { name: "Parallel" },
        { name: "Pause" },
        { name: "Scheduler" },
        { name: "Sequence" },
        { name: "Transition" },
        { name: "Transitioner" },
        { name: "TransitionEvent" },
        { name: "Tween" }
      ]
    }
  ]
};

const CollapsibleTree = ({ treeData = data, width = 1600, height = 1000 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const root = d3.hierarchy(treeData);
    root.x0 = height / 2;
    root.y0 = 0;

  // Add left margin to ensure root node is visible
  const leftMargin = 200;
  const treeLayout = d3.tree().size([height, width - leftMargin]);
    treeLayout(root);

    // Collapse all children initially
    root.children?.forEach(collapse);

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source) {
      const nodes = root.descendants();
      const links = root.links();

      // Compute the new tree layout.
      treeLayout(root);

  // Increase horizontal spacing for each depth to reduce clutter
  nodes.forEach(d => d.y = d.depth * 350 + leftMargin);

      // Nodes
      const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        });

      nodeEnter.append('circle')
        .attr('r', 1e-6)
        .style('fill', d => d._children ? '#555' : '#999');

      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', d => d.children || d._children ? -13 : 13)
        .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
        .text(d => d.data.name);

      // Transition nodes to their new position.
      const nodeUpdate = nodeEnter.merge(node);
      nodeUpdate.transition()
        .duration(200)
        .attr('transform', d => `translate(${d.y},${d.x})`);

      nodeUpdate.select('circle')
        .attr('r', 10)
        .style('fill', d => d._children ? '#555' : '#999');

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition()
        .duration(200)
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select('circle')
        .attr('r', 1e-6);

      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      // Links
      const link = svg.selectAll('path.link')
        .data(links, d => d.target.id);

      // Always draw links for visible children, even if collapsed
      link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', d => diagonal(d))
        .style('stroke', '#555')
        .style('stroke-width', 1.5)
        .style('stroke-dasharray', '4,4')
        .style('fill', 'none');

      link.transition()
        .duration(200)
        .attr('d', diagonal)
        .style('stroke', '#555')
        .style('stroke-width', 1.5)
        .style('stroke-dasharray', '4,4')
        .style('fill', 'none');

      link.exit().transition()
        .duration(200)
        .attr('d', d => diagonal(d))
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function diagonal(d) {
      return `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`;
    }

    let i = 0;
    svg.attr('width', width).attr('height', height);
    update(root);
  }, [treeData, width, height]);

  return (
    <div className="collapsible-tree-container">
      <svg ref={svgRef} className="collapsible-tree-svg" viewBox={`0 0 ${width} ${height}`}></svg>
    </div>
  );
};

export default CollapsibleTree;
