import React from 'react';
import {Avatar, Card, CardActionArea, CardActionAreaProps, CardHeader, SxProps} from "@mui/material";

const avatarSx: SxProps = {
  bgcolor: 'success.main'
};

export default function ReadItem({
                                   title,
                                   onClick,
                                 }: {
  title: string;
  onClick: NonNullable<CardActionAreaProps['onClick']>;
}) {
  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar sx={avatarSx}>
              ✔
            </Avatar>
          }
          title={title}
        />
      </CardActionArea>
    </Card>
  );
}
