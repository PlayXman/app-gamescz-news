"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {notificationsGetToken, notificationsRegister, notificationsUnregister} from '../../_utils/permanentStorage';

export default function NotificationRegistrationButton() {
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  // Check if the user is already registered for notifications
  useEffect(() => {
    notificationsGetToken().then((token) => {
      if(token && token.key != null) {
        setRegistered(true);
      }

      setLoading(false);
    }).catch((error) => {
      console.error(error);
      alert(error);
      setLoading(false);
    })
  }, []);

  const handleRegister = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();

      switch (permission) {
        case 'granted':
          console.log('Notification permission granted.');
          await notificationsRegister();
          setRegistered(true);
          break;
        case 'denied':
          alert('Permission denied. You will not receive any notifications.');
          break;
        default:
      }
    } catch (error) {
      console.error(error);
      alert('Failed to register for notifications.');
    }
  }, []);

  const handleUnregister = useCallback(async () => {
    try {
      await notificationsUnregister();
      setRegistered(false);
    } catch (error) {
      console.error(error);
      alert('Failed to unregister from notifications.');
    }
  }, []);

  return (
    <Button
      variant={registered ? 'outlined' : 'contained'}
      onClick={registered ? handleUnregister : handleRegister}
      loading={loading}
    >
      {registered ? 'Unregister notifications' : 'Register for notifications'}
    </Button>
  );
}
