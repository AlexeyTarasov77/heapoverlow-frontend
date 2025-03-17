import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../shared/store/UsersSlice';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function LogoutPage() {
  const isNotAuthenticated = !useAppSelector(state => state.users.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  console.log(isNotAuthenticated)
  useEffect(() => {
    if (isNotAuthenticated) {
      navigate("/")
    }
  }, [])
  const onLogoutConfirm = () => {
    dispatch(logout())
    navigate("/users/signin")
  }
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-blue-500 shadow-blue-400 p-5 shadow-md">
        <Typography gutterBottom variant="h4">Are you sure you want to logout?</Typography>
        <div className="flex gap-3">
          <Button variant="contained" onClick={onLogoutConfirm}>Yes</Button>
          <Button variant="contained" color="error" onClick={() => navigate(-1)}>No</Button>
        </div>
      </div>
    </div>
  )
}
