import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import {updateUser} from './userSlice'
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return 
    dispatch(updateUser(username))
    navigate('/menu')
    
    
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-2/3"
      />

      {username !== "" && (
        <div>
          <Button>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
