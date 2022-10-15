import { useEffect, useState } from 'react';
import { EntityWithPosition, Entity } from '../../models/api/Entity';
import GenericCard from '../Card/Card';

const Channels = ({ filter }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [channels, setChannels] = useState<Array<EntityWithPosition> | undefined>(undefined);

  useEffect(() => {
    fetch('api/channels')
      .then(res => res.json())
      .then((data: Array<Entity>) => {
        setChannels(
          data.map((entity, index) => {
            const entityWithPosition = entity as EntityWithPosition;
            entityWithPosition.position = index + 1;

            return entityWithPosition;
          })
        );
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
            !filter || channel.title.search(filter) ? (
              <GenericCard entity={channel} key={channel.title} />
            ) : undefined
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
