import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Channel } from '../../pages/api/channels';
import GenericCard from '../Card/Card';

const Channels: NextPage<Props> = ({ filter }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [channels, setChannels] = useState<Array<Channel> | undefined>(undefined);

  useEffect(() => {
    fetch('api/channels')
      .then(res => res.json())
      .then(data => {
        setChannels(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : channels ? (
        <div>
          {channels.map(channel =>
            !filter || channel.title.search(filter) ? <GenericCard entity={channel} /> : undefined
          )}
        </div>
      ) : (
        <h1>No channels found</h1>
      )}
    </>
  );
};

export default Channels;

interface Props {
  filter?: string;
}
