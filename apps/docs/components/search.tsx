import * as React from "react"
import { DocsSearch as OssonuDocsSearch, toast } from "@ossonu/ui"
import { CodeIcon, ComponentIcon, MapIcon, Route } from "lucide-react"

import { Icons } from "./icons"

interface DocsSearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function DocsSearch({ className, ...props }: DocsSearchProps) {
  async function onSubmit(event: React.SyntheticEvent) {
    "use server"
    event.preventDefault()
    return toast({
      title: "Not implemented",
      description: "We're still working on the search.",
    })
  }

  return (
    <OssonuDocsSearch
      commands={[
        {
          heading: "Documentation",
          commandItems: [
            {
              heading: "Components",
              href: "/docs/documentation/code-blocks",
              icon: <ComponentIcon className="me-3 h-12 w-12" />,
            },
            {
              heading: "Code blocks",
              href: "/docs/documentation/components",
              icon: <CodeIcon className="me-3 h-12 w-12" />,
            },
            {
              heading: "Style guide",
              href: "/docs/documentation/style-guide",
              icon: <MapIcon className="me-3 h-12 w-12" />,
            },
          ],
        },
        {
          heading: "Blog",
          commandItems: [
            {
              heading: "Build a blog using contentlayer",
              href: "/blog/build-blog-using-contentlayer",
              icon: <Icons.page className="me-3 h-12 w-12" />,
            },
            {
              heading: "Tanstack Router",
              href: "/blog/tanstack-router",
              icon: <Route className="me-3 h-12 w-12" />,
            },
          ],
        },
      ]}
    />
  )
}
