import { cn } from "@/lib/utils"
import { ComponentProps, ReactNode } from "react"
import { TypographyH2, TypographyH3, TypographyMuted, TypographyP } from ".."

interface Feature {
    icon: any
    title: ReactNode
    description: ReactNode
    component: "li" | "a" | "div"
}
interface OssonFeaturesProps extends Omit<ComponentProps<"section">, "title"> {
    title: ReactNode
    subtitle: ReactNode
    features: Feature[]
}
export function OssonFeatures({
    features,
    title,
    subtitle,
    className,
}: OssonFeaturesProps) {
    return (
        <section
            id="features"
            className={cn(
                "container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24",
                className
            )}
        >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <TypographyH2>{title}</TypographyH2>
                <TypographyMuted>{subtitle}</TypographyMuted>
            </div>
            <ul className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {features.map((feature) => (
                    <FeatureCard feature={feature} />
                ))}
            </ul>
        </section>
    )
}

export function FeatureCard({ feature }: { feature: Feature }) {
    return (
        <li className="relative overflow-hidden rounded-lg border bg-background p-2 cursor-pointer group transition-colors hover:bg-foreground hover:text-background">
            <div className="flex  flex-col justify-between items-start rounded-md p-6 space-y-3">
                <div className="w-12 h-12">{feature.icon}</div>
                <div className="space-y-2">
                    <TypographyH3>{feature.title}</TypographyH3>
                    <TypographyP className="text-muted-foreground group-hover:text-background">
                        {feature.description}
                    </TypographyP>
                </div>
            </div>
        </li>
    )
}
