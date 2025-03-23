import { Avatar, AvatarProps } from "@mui/material";

interface IProps extends AvatarProps {
  username: string;
  imageUrl: string | null;
}

export function UserAvatar({ username, imageUrl, ...props }: IProps) {
  if (imageUrl) {
    return <Avatar {...props} src={imageUrl} />;
  }
  return <Avatar {...props}>{username[0].toUpperCase()}</Avatar>;
}
