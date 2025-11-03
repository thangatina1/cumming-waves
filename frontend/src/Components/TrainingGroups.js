import React from 'react';

const TrainingGroups = () => {
  return (
    <div>
<h1 className="primary-heading">Training Groups</h1>

    <div className="training-groups">
      
      
      <table>
        <thead>
          <tr>
            <th>Group</th>
            <th>Pool Schedule</th>
            <th>Dry Land Schedule</th>
            <th>Additional Information</th>
            <th>Monthly Fee in USD $</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RW</td>
            <td>4:30-6:30p Tuesdays and Fridays</td>
            <td>4:45-5p then Pool 7p Monday, Wednesday and Thursday</td>
            <td>*Morning Dry land via Zoom, Tuesday and Fridays 5:45-6:15am (Coach Eli)</td>
            <td>$200</td>
          </tr>
          <tr>
            <td>JR RW</td>
            <td>M-F 5:00-6:30p</td>
            <td>M, W and TH 6:30-6:45p, ZOOM Dry land Tuesday and Friday at 5:45-6:15am with Coach Eli</td>
            <td>***Dry land -shirt, shorts and athletic shoes are required.</td>
            <td>$185</td>
          </tr>
          <tr>
            <td>5 Day TS</td>
            <td>M-F 5:00-6:15</td>
            <td>*Dry land will be during your practice time.</td>
            <td></td>
            <td>$170</td>
          </tr>
          <tr>
            <td>3 Day TS</td>
            <td>M, W, Th 5:00-6:15</td>
            <td>*Dry land will be during your practice time</td>
            <td></td>
            <td>$160</td>
          </tr>
          <tr>
            <td>5 Day Purples</td>
            <td>M-F 5-6pm</td>
            <td>*Dry land will be during your practice time</td>
            <td></td>
            <td>$170</td>
          </tr>
          <tr>
            <td>3 Day Purples</td>
            <td>M, W, Th 5-6p</td>
            <td>*Dry land will be during your practice time</td>
            <td></td>
            <td>$160</td>
          </tr>
          <tr>
            <td>Junior Blue</td>
            <td>M, W, Th 6:15-7p</td>
            <td></td>
            <td></td>
            <td>$140</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    
  );
};

export default TrainingGroups;