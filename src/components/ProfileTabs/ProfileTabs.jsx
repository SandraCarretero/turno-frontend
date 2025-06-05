import { TabContainer, Tab } from './ProfileTabs.styles';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'matches', label: 'Partidas' },
    { id: 'games', label: 'Juegos' },
    { id: 'friends', label: 'Amigos' }
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
