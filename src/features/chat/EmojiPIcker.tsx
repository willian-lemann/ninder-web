import {
  useState,
  forwardRef,
  useImperativeHandle,
  MouseEvent,
  useEffect,
} from "react";

import ReactEmojiPicker, { EmojiStyle, Props } from "emoji-picker-react";

export type { EmojiClickData } from "emoji-picker-react";

export interface Handles {
  openEmojiPicker: () => void;
}

interface EmojiPickerProps extends Props {}

export const EmojiPicker = forwardRef((props: EmojiPickerProps, ref) => {
  const [visible, setVisible] = useState(false);

  const openEmojiPicker = () => {
    setVisible(true);
  };

  const closeEmojiPicker = (event: MouseEvent<HTMLDivElement>) => {};

  useImperativeHandle(ref, () => ({
    openEmojiPicker,
  }));

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const classlist = Array.from(
        event.target.parentElement.classList
      ) as string[];

      const emojiContainerClasses = [
        "emoji",
        "search",
        "select",
        "category",
        "header",
      ];

      const clickInsideEmojiContainer = classlist.some((classItem) =>
        emojiContainerClasses.some((containerClassItem) =>
          classItem.includes(containerClassItem)
        )
      );

      if (!clickInsideEmojiContainer) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="emoji-container"
      className="w-fit bgp"
      onMouseDown={(event) => closeEmojiPicker(event)}
    >
      <ReactEmojiPicker
        emojiStyle={EmojiStyle.NATIVE}
        lazyLoadEmojis
        searchPlaceHolder="Search for a emoji"
        autoFocusSearch={false}
        {...props}
      />
    </div>
  );
});
