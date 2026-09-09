import React from 'react';
import dynamic from 'next/dynamic';
import { Tab, TabList, TabPanel } from 'react-tabs';

const Tabs = dynamic(() => import('react-tabs').then((mod) => mod.Tabs), {
  ssr: false,
});

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
