import React, { memo } from 'react';

import { List } from './List';
import { Card } from './Card';

export const InnerList = memo(({ 
  type,
  list,
  cards,
  index,
}) => {
  if (type === 'list') {
    const listCards = list.cardIds.map(cardId => cards[cardId]);

    return <List list={list} cards={listCards} index={index} />;
  }

  return cards?.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));
});