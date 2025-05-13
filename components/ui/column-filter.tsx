'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Check, LucideIcon, PlusCircle } from "lucide-react"
import { useState } from "react"
import { Table } from "@tanstack/react-table"

export type ColumnItem = {

    value: string;
    label: string;
    icon: LucideIcon;
};
interface DataTableColumnFilterProps<TData> {
    data: TData[];
    table: Table<TData>
    columnName: string,
    listItem: ColumnItem[]
}

export function DataTableColumnFilter<TData>({
    data,
    table,
    columnName,
    listItem,

}: Readonly<DataTableColumnFilterProps<TData>>) {
    const [selected, setSelected] = useState<string[]>([])

    const getCount = (value: string): number => {
        return data.filter((item) =>
            String(item[columnName.toLowerCase() as keyof TData]) === value
        ).length;
    };
    const toggleItems = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
        setSelected(newSelected);
        table.getColumn(columnName.toLowerCase())?.setFilterValue(newSelected);
    }
    const clearItems = () => {
        setSelected([]);
        table.getColumn(columnName.toLowerCase())?.setFilterValue(undefined);
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start mx-1 cursor-pointer">
                    <PlusCircle /> {columnName}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandGroup>
                        {listItem.map((item) => {
                            const Icon = item.icon;
                            return (

                                <CommandItem
                                    key={item.value}
                                    onSelect={() => toggleItems(item.value)}
                                    className="cursor-pointer"
                                >
                                    <Checkbox
                                        checked={selected.includes(item.value)}
                                        onCheckedChange={() => toggleItems(item.value)}
                                        className="mr-2"
                                    />
                                    <Icon />
                                    <span>{item.label}</span>
                                    <span className="ml-auto text-muted-foreground text-xs">
                                        {getCount(item.value)}
                                    </span>
                                </CommandItem>

                            );
                        })}


                    </CommandGroup>
                    <CommandGroup>
                        {
                            selected.length > 0 &&
                            <CommandItem onSelect={clearItems} className="flex align-middle justify-center">
                                Clear Filter
                            </CommandItem>
                        }
                    </CommandGroup>
                </Command>
            </PopoverContent>

            {/* Selected badges */}
            <div className="flex flex-wrap gap-1">
                {selected.length < 3 ? selected.map((item) => {
                    const label = listItem.find((s) => s.value === item)?.label
                    return (
                        <Badge
                            key={item}
                            variant="outline"
                            onClick={() => toggleItems(item)}
                            className="cursor-pointer py-2"
                        >
                            {label}
                            <Check className="ml-1 h-3 w-3" />
                        </Badge>
                    )
                }) :
                    <Badge
                        variant="outline"
                        className="cursor-pointer py-2"
                        onClick={() => clearItems()}
                    >
                        {selected.length} selected
                        <Check className="ml-1 h-3 w-3" />
                    </Badge>
                }
            </div>
        </Popover>
    )
}
