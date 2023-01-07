import { useEffect, useState } from 'react';
import { Entity, EntityWithPosition } from '../../models/api/Entity';
import Box from '@mui/material/Box';
import GenericCard from '../Card/Card';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from '../../styles/Grid.module.css';

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
        })
        .catch((error: Error) => {
          console.error(`Failed to fetch entities with error: ${error.message}`);
        });
    }
  }, [submodule]);

  function getFilteredEntities() {
    const confusedEmoji = <Box style={{ fontSize: '75px' }}>😕</Box>;

    if (entities && entities.length > 0) {
      let noEntityMatches = filter != undefined;
      const filtered = [];

      for (const entity of entities) {
        if (!filter || entity.title.toLowerCase().includes(filter)) {
          filtered.push(
            <GenericCard isLeaderboard={submodule !== '/bots'} entity={entity} key={entity.link} />
          );

          if (noEntityMatches) {
            noEntityMatches = false;
          }
        }
      }

      if (noEntityMatches) {
        return (
          <Box sx={{ textAlign: 'center' }}>
            <h1>No matches for {`"${filter ?? ''}"`}</h1>
            {confusedEmoji}
          </Box>
        );
      }

      return <div className={styles.flexGrid}>{filtered}</div>;
    }

    return (
      <Box sx={{ textAlign: 'center' }}>
        <h1>No results</h1>
        {confusedEmoji}
      </Box>
    );
  }

  return <>{loading ? <LoadingSpinner /> : getFilteredEntities()}</>;
};

export default Grid;

interface Props {
  submodule: string;
  filter?: string;
}
