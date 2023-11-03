import { cn } from "@/lib/utils"
import Link from "next/link"
import { ComponentProps } from "react"
import { Url } from "url"
import {
    ButtonProps,
    TypographyH1,
    TypographyLead,
    buttonVariants,
} from "../index"
interface OssonHeroWithImageProps {
    withImage?: boolean
    img: any
}
interface OssonHeroWithoutImageProps {
    withImage?: false
}
interface OssonHeroButton extends ButtonProps {
    title: string
    icon: any
    href: string | Url
}
type OssonHeroProps = {
    title: string
    subtitle: string
    buttons: OssonHeroButton[]
} & (OssonHeroWithImageProps | OssonHeroWithoutImageProps) &
    ComponentProps<"section">

export function OssonHero(props: OssonHeroProps) {
    if (props.withImage) {
        return <OssonHeroWithImage {...props} />
    }
    return <OssonDefaultHero {...props} />
}

function OssonDefaultHero({
    title,
    buttons,
    subtitle,
    className,
    ...props
}: OssonHeroProps) {
    return (
        <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl space-y-4 text-center lg:py-16 lg:px-12">
                <TypographyH1>{title}</TypographyH1>
                <TypographyLead>{subtitle}</TypographyLead>
                <ul className="flex flex-row justify-center items-center gap-2 mb-8 lg:mb-16 sm:justify-center sm:space-y-0 sm:space-x-4">
                    {buttons.map((button) => (
                        <li>
                            <Link
                                href={button.href}
                                className={cn(
                                    buttonVariants({
                                        variant: button.variant || "default",
                                        size: button.size || "default",
                                    })
                                )}
                            >
                                {button.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
function OssonHeroWithImage({ className, ...props }: OssonHeroProps) {
    return (
        <section className={cn("bg-primary", className)} {...props}>
            <div className="container mx-auto">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <TypographyH1>{props.title}</TypographyH1>
                        <TypographyLead>{props.subtitle}</TypographyLead>
                        <ul className="flex gap-6 flex-wrap [&>*]:flex-1">
                            {props.buttons.map((button) => (
                                <li>
                                    <Link
                                        href={button.href}
                                        className={cn(
                                            buttonVariants({
                                                variant: button.variant,
                                                size: button.size,
                                            })
                                        )}
                                    >
                                        {button.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        {props.withImage && props.img}
                    </div>
                </div>
            </div>
        </section>
    )
}
