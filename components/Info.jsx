import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Info = ({ ingredients, weight, delivery }) => (
  <Tabs>
    <TabList>
      <Tab>Description</Tab>
      <Tab>Additional Information</Tab>
    </TabList>

    <TabPanel>
      <h2>{ingredients}</h2>
      <p>{ingredients}</p>
    </TabPanel>
    <TabPanel>
      <h2>Additional Information</h2>
      <table className="additional-info">
        <tbody>
          <tr>
            <th>Weight</th>
            <td>
              <p>{weight}</p>
            </td>
          </tr>
          <tr>
            <th>Delivery</th>
            <td>
              <p>{delivery}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </TabPanel>
  </Tabs>
);

export default Info;
