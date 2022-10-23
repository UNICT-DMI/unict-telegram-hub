import { useEffect, useState } from 'react';
import { EntityWithPosition, Entity } from '../../models/api/Entity';
import GenericCard from '../Card/Card';
import styles from '../../styles/Grid.module.css';

const Grid = ({ submodule, filter }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [entities, setEntities] = useState<Array<EntityWithPosition> | undefined>(undefined);

  useEffect(() => {
    fetch('api/channels')
      .then(res => res.json())
      .then((data: Array<Entity>) => {
        setEntities(
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
      ) : entities ? (
        <div className={styles.flexGrid}>
          {entities.map(channel =>
            !filter || channel.title.toLowerCase().search(filter) > -1 ? (
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

export default Grid;

interface Props {
  submodule: string;
  filter?: string;
}
