import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }){
  const user = JSON.parse(localStorage.getItem('quiz_user'));
  if(!user) return <Navigate to="/" replace />;
  return children;
}
