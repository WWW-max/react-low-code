import React from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
  const { id } = useParams();
  return <div>Edit-{id}</div>;
}
