import { TabContainer, Tab } from './ProfileTabs.styles';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'matches', label: 'Matches' },
    { id: 'games', label: 'Games Collection' },
    { id: 'friends', label: 'Friends' }
  ];

  return (
    <TabContainer>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          $active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default ProfileTabs;
