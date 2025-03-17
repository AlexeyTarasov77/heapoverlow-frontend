import { redirect } from "react-router-dom";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useAppSelector } from "../../../app/hooks";
import { Avatar } from "@mui/material";

export function ProfilePage() {
  const user = useAppSelector(state => state.users.user)
  if (!user) {
    redirect("/users/signin")
    return <div></div>
  }
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        {user.imageUrl ? <Avatar src={user.imageUrl} /> : <Avatar>{user.username[0].toUpperCase()}</Avatar>}
        <div>
          <div className="font-bold">{user.username}</div>
          <div>Member since: <EditCalendarIcon /> {user.createdAt.toLocaleString()}</div>
          <div>From: <LocationCityIcon /> {user.location}</div>
          <div>Reputation: {user.reputation}</div>
        </div>
      </div>
      <div className="border-black"></div>
    </div>
  )
}
