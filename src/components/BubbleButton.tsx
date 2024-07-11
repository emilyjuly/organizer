import { ComponentProps, ReactNode } from "react";

export interface BubbleButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

const BubbleButton = (props: BubbleButtonProps) => {
  return (
    <button
      className="flex items-center gap-1.5 p-2 text-sm font-medium leading-none text-zinc-600 hover:bg-zinc-200 data-[active=true]:text-violet-400"
      {...props}
    />
  );
};

export default BubbleButton;
