"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../components/ui/command"
import { Input } from "../index"
import { cn } from "../lib/utils"
interface CommandGroup {
    heading: string
    commandItems: {
        heading: string
        href: string
        icon: JSX.Element
    }[]
}
interface DocsSearchProps extends Omit<React.ComponentProps<"form">, "action"> {
    // searchFunction: (e: SyntheticEvent) => any
    commands: CommandGroup[]
}

export function DocsSearch({ className, commands, ...props }: DocsSearchProps) {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
    const toggleSearchOpen = () => setIsSearchOpen((open) => !open)
    const router = useRouter()
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsSearchOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                toggleSearchOpen()
            }}
            className={cn("relative w-full", className)}
            {...props}
        >
            <Input
                readOnly
                onKeyDown={() => toggleSearchOpen()}
                onClick={toggleSearchOpen}
                type="search"
                name="search"
                placeholder="Search documentation..."
                className="h-8 w-full sm:w-64 sm:pr-12"
            />
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
            </kbd>
            <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {commands.map((commandGroup) => (
                        <>
                            <CommandGroup
                                key={commandGroup.heading}
                                heading="Suggestions"
                            >
                                {commandGroup.commandItems.map((command) => (
                                    <Link
                                        href={command.href}
                                        key={command.heading}
                                        className="cursor-pointer"
                                    >
                                        <CommandItem
                                            onSelect={(e) => {
                                                router.push(command.href)
                                                setIsSearchOpen(false)
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {command.icon}
                                            <span>{command.heading}</span>
                                        </CommandItem>
                                    </Link>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    ))}
                </CommandList>
            </CommandDialog>
        </form>
    )
}
