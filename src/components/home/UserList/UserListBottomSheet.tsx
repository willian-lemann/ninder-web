import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";

export function UserListBottomSheet() {
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      open
      ref={sheetRef}
      blocking={false}
      className="md:hidden"
      expandOnContentDrag
      header={<header>More than 100 users near</header>}
      snapPoints={({ maxHeight }) => [300, 600]}
    >
      <div className="h-full p-4">aspdoksd asdoksad</div>
    </BottomSheet>
  );
}
