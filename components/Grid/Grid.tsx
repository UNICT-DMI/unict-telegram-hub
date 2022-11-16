import { useEffect, useState } from 'react';
import { EntityWithPosition, Entity } from '../../models/api/Entity';
import GenericCard from '../Card/Card';
import styles from '../../styles/Grid.module.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Grid = ({ submodule, filter }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [entities, setEntities] = useState<Array<EntityWithPosition> | undefined>(undefined);

  useEffect(() => {
    if (submodule !== '/[submodule]') {
      setLoading(true);
      fetch(`api/${submodule}`)
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
    }
  }, [submodule]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : entities ? (
        <div className={styles.flexGrid}>
          {entities.map(entity =>
            !filter || entity.title.toLowerCase().search(filter) > -1 ? (
              <GenericCard entity={entity} key={entity.link} />
            ) : undefined
          )}
        </div>
      ) : (
        <h1>No results 😕</h1>
      )}
    </>
  );
};

export default Grid;

interface Props {
  submodule: string;
  filter?: string;
}
