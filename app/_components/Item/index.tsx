import React, {useCallback, useMemo} from 'react';
import {
  CardActionAreaProps,
} from "@mui/material";
import {useReadItems} from "@/app/_components/ReadItemsProvider";
import ReadItem from "@/app/_components/Item/ReadItem";
import UnreadItem from "@/app/_components/Item/UnreadItem";

export default function Item({
                               title,
                               imageUrl,
                               targetUrl,
                               description,
                               publishedAt
                             }: {
  title: string;
  imageUrl: string | undefined;
  targetUrl: string | undefined;
  description?: string;
  publishedAt?: string;
}) {
  const {hiddenItems, toggleItem} = useReadItems();

  const publishedAtDate = useMemo(() => publishedAt ? new Date(publishedAt) : undefined, [publishedAt]);

  const handleHideUnhide = useCallback<NonNullable<CardActionAreaProps['onClick']>>((event) => {
    event.preventDefault();
    toggleItem(title);
  }, [toggleItem, title]);

  // Read
  if (hiddenItems.has(title)) {
    return (
      <ReadItem title={title} onClick={handleHideUnhide}/>
    );
  }

  // Unread
  return (
    <UnreadItem
      title={title}
      imageUrl={imageUrl}
      targetUrl={targetUrl}
      description={description}
      publishedAt={publishedAtDate}
      onHide={handleHideUnhide}
    />
  );
}
