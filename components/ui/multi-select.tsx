"use client";

import { Check, X as RemoveIcon } from "lucide-react";
import { Command, CommandEmpty, CommandItem, CommandList } from "@/components/ui/command";
import {
   ComponentPropsWithoutRef,
   Dispatch,
   ElementRef,
   HTMLAttributes,
   KeyboardEvent,
   MouseEventHandler,
   RefObject,
   SetStateAction,
   SyntheticEvent,
   createContext,
   forwardRef,
   useCallback,
   useContext,
   useRef,
   useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

interface MultiSelectorProps extends ComponentPropsWithoutRef<typeof CommandPrimitive> {
   values: Array<string | number>;
   // eslint-disable-next-line no-unused-vars
   onValuesChange: (value: Array<string | number>) => void;
   loop?: boolean;
}

interface MultiSelectContextProps {
   value: Array<string | number>;
   // eslint-disable-next-line no-unused-vars
   onValueChange: (val: string | number) => void; // TODO
   open: boolean;
   // eslint-disable-next-line no-unused-vars
   setOpen: (value: boolean) => void;
   inputValue: string;
   setInputValue: Dispatch<SetStateAction<string>>;
   activeIndex: number;
   setActiveIndex: Dispatch<SetStateAction<number>>;
   ref: RefObject<HTMLInputElement>;
   // eslint-disable-next-line no-unused-vars
   handleSelect: (e: SyntheticEvent<HTMLInputElement>) => void;
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
   const context = useContext(MultiSelectContext);
   if (!context) {
      throw new Error("useMultiSelect must be used within MultiSelectProvider");
   }
   return context;
};

/**
 * MultiSelect Docs: {@link: https://shadcn-extension.vercel.app/docs/multi-select}
 */

// TODO : expose the visibility of the popup

const MultiSelector = ({
   values: value,
   onValuesChange: onValueChange,
   loop = false,
   className,
   children,
   dir,
   ...props
}: MultiSelectorProps) => {
   const [inputValue, setInputValue] = useState("");
   const [open, setOpen] = useState<boolean>(false);
   const [activeIndex, setActiveIndex] = useState<number>(-1);
   const inputRef = useRef<HTMLInputElement>(null);
   const [isValueSelected, setIsValueSelected] = useState(false);
   const [selectedValue, setSelectedValue] = useState("");

   const onValueChangeHandler = useCallback(
      (val: string | number) => {
         if (value.includes(val)) {
            onValueChange(value.filter((item) => item !== val));
         } else {
            onValueChange([...value, val]);
         }
      },
      // TODO delete eslint-disable-next-line react-hooks/exhaustive-deps
      [value],
   );

   const handleSelect = useCallback(
      (e: SyntheticEvent<HTMLInputElement>) => {
         e.preventDefault();
         const target = e.currentTarget;
         const selection = target.value.substring(target.selectionStart ?? 0, target.selectionEnd ?? 0);

         setSelectedValue(selection);
         setIsValueSelected(selection === inputValue);
      },
      [inputValue],
   );

   const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
         e.stopPropagation();
         const target = inputRef.current;

         if (!target) return;

         const moveNext = () => {
            const nextIndex = activeIndex + 1;
            setActiveIndex(nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex);
         };

         const movePrev = () => {
            const prevIndex = activeIndex - 1;
            setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
         };

         const moveCurrent = () => {
            const newIndex = activeIndex - 1 <= 0 ? (value.length - 1 === 0 ? -1 : 0) : activeIndex - 1;
            setActiveIndex(newIndex);
         };

         switch (e.key) {
            case "ArrowLeft":
               if (dir === "rtl") {
                  if (value.length > 0 && (activeIndex !== -1 || loop)) {
                     moveNext();
                  }
               } else {
                  if (value.length > 0 && target.selectionStart === 0) {
                     movePrev();
                  }
               }
               break;

            case "ArrowRight":
               if (dir === "rtl") {
                  if (value.length > 0 && target.selectionStart === 0) {
                     movePrev();
                  }
               } else {
                  if (value.length > 0 && (activeIndex !== -1 || loop)) {
                     moveNext();
                  }
               }
               break;

            case "Backspace":
            case "Delete":
               if (value.length > 0) {
                  if (activeIndex !== -1 && activeIndex < value.length) {
                     onValueChangeHandler(value[activeIndex]);
                     moveCurrent();
                  } else {
                     if (target.selectionStart === 0) {
                        if (selectedValue === inputValue || isValueSelected) {
                           onValueChangeHandler(value[value.length - 1]);
                        }
                     }
                  }
               }
               break;

            case "Enter":
               setOpen(true);
               break;

            case "Escape":
               if (activeIndex !== -1) {
                  setActiveIndex(-1);
               } else if (open) {
                  setOpen(false);
               }
               break;
         }
      },
      // TODO delete eslint-disable-next-line react-hooks/exhaustive-deps
      [value, inputValue, activeIndex, loop],
   );

   return (
      <MultiSelectContext.Provider
         value={{
            value,
            onValueChange: onValueChangeHandler,
            open,
            setOpen,
            inputValue,
            setInputValue,
            activeIndex,
            setActiveIndex,
            ref: inputRef,
            handleSelect,
         }}
      >
         <Command
            onKeyDown={handleKeyDown}
            className={cn("overflow-visible bg-transparent flex flex-col space-y-2", className)}
            dir={dir}
            {...props}
         >
            {children}
         </Command>
      </MultiSelectContext.Provider>
   );
};

interface Option {
   id: string | number;
   name: string;
   [key: string]: unknown;
}

interface MultiSelectorTriggerProps extends HTMLAttributes<HTMLDivElement> {
   options: Option[];
}

const MultiSelectorTrigger = forwardRef<HTMLDivElement, MultiSelectorTriggerProps>(
   ({ className, children, options, ...props }, ref) => {
      const { value, onValueChange, activeIndex } = useMultiSelect();

      const optionValues: Record<Option["id"], Option["name"]> = options.reduce(
         (acc, v) => ({ ...acc, [v.id]: v.name }),
         {},
      );

      const mousePreventDefault: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
         e.preventDefault();
         e.stopPropagation();
      }, []);

      return (
         <div
            ref={ref}
            className={cn(
               "flex flex-wrap gap-1 p-1 py-2 ring-1 ring-muted rounded-lg bg-background",
               {
                  "ring-1 focus-within:ring-ring": activeIndex === -1,
               },
               className,
            )}
            {...props}
         >
            {value.map((item, index) => (
               <Badge
                  key={item}
                  className={cn(
                     "px-1 rounded-xl flex items-center gap-1",
                     activeIndex === index && "ring-2 ring-muted-foreground ",
                  )}
                  variant={"secondary"}
               >
                  <span className="text-xs">{optionValues[item]}</span>
                  <button
                     aria-label={`Remove ${item} option`}
                     aria-roledescription="button to remove option"
                     type="button"
                     onMouseDown={mousePreventDefault}
                     onClick={() => onValueChange(item)}
                  >
                     <span className="sr-only">Remove {item} option</span>
                     <RemoveIcon className="h-4 w-4 hover:stroke-destructive" />
                  </button>
               </Badge>
            ))}
            {children}
         </div>
      );
   },
);

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = ({ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive.Input>) => {
   const {
      setOpen,
      inputValue,
      setInputValue,
      activeIndex,
      setActiveIndex,
      handleSelect,
      ref: inputRef,
   } = useMultiSelect();

   return (
      <CommandPrimitive.Input
         {...props}
         tabIndex={0}
         ref={inputRef}
         value={inputValue}
         onValueChange={activeIndex === -1 ? setInputValue : undefined}
         onSelect={handleSelect}
         onBlur={() => setOpen(false)}
         onFocus={() => setOpen(true)}
         onClick={() => setActiveIndex(-1)}
         className={cn(
            "ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1",
            className,
            activeIndex !== -1 && "caret-transparent",
         )}
      />
   );
};

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children }, ref) => {
   const { open } = useMultiSelect();
   return (
      <div ref={ref} className="relative">
         {open && children}
      </div>
   );
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef<
   ElementRef<typeof CommandPrimitive.List>,
   ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children }, ref) => {
   return (
      <CommandList
         ref={ref}
         className={cn(
            "p-2 flex flex-col gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg w-full absolute bg-background shadow-md z-10 border border-muted top-0",
            className,
         )}
      >
         {children}
         <CommandEmpty>
            <span className="text-muted-foreground">No results found</span>
         </CommandEmpty>
      </CommandList>
   );
});

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = forwardRef<
   ElementRef<typeof CommandPrimitive.Item>,
   { value: string | number } & Omit<ComponentPropsWithoutRef<typeof CommandPrimitive.Item>, "value">
>(({ className, value, children, ...props }, ref) => {
   const { value: Options, onValueChange, setInputValue } = useMultiSelect();

   const mousePreventDefault: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
   }, []);

   const isIncluded = Options.includes(value);

   return (
      <CommandItem
         ref={ref}
         {...props}
         onSelect={() => {
            onValueChange(value);
            setInputValue("");
         }}
         className={cn(
            "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between ",
            className,
            isIncluded && "opacity-50 cursor-default",
            props.disabled && "opacity-50 cursor-not-allowed",
         )}
         onMouseDown={mousePreventDefault}
      >
         {children}
         {isIncluded && <Check className="h-4 w-4" />}
      </CommandItem>
   );
});

MultiSelectorItem.displayName = "MultiSelectorItem";

export {
   MultiSelector,
   MultiSelectorTrigger,
   MultiSelectorInput,
   MultiSelectorContent,
   MultiSelectorList,
   MultiSelectorItem,
};
