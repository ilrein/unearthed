import React from 'react'
import { Card, Feed, Icon } from 'semantic-ui-react';
import moment from 'moment';

import styles from './styles.scss';

const NewsFeed = ({ data, onClose }) =>
  <Card className={styles.black}>
    <Card.Content>
      <Card.Header className={styles.white}>
        Recent Activity <a><Icon name="window close" onClick={onClose} /></a>
      </Card.Header>
    </Card.Content>
    <Card.Content>
      {data.value.map((article, key) =>
        <Feed key={key}>
          <Feed.Event>
            {article.image ? <Feed.Label image={article.image.thumbnail.contentUrl} /> : <div />}
            <Feed.Content>
              <Feed.Date className={styles.blue} content={moment(article.datePublished).fromNow()} />
              <Feed.Summary className={styles.white}>
                <a target="_blank" href={article.url}>{article.name}</a>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      )}
    </Card.Content>
  </Card>;


export default NewsFeed;
