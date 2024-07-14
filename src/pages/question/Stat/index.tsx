import React from 'react';
import { useParams } from 'react-router-dom';

export default function Stat() {
  const { id } = useParams();
  return <div>Stat-{id}</div>;
}
