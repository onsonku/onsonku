"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ComponentProps, FC, useMemo, useState } from "react"
import { useController, useForm } from "react-hook-form"
import { ZodObject, ZodRawShape, z } from "zod"
import {
    Button,
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useToast,
} from "../index"
import { cn, objectToFormData } from "../lib/utils"
import {
    TypographyH2 as HeadingTwo,
    TypographyP as Paragraph,
} from "./typography"
// Import React FilePond

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { ImageUploader } from "./image-uploader"

const schema = z.object({})

export interface InputGroup extends Omit<ComponentProps<"input">, "ref"> {
    label: string
}

interface IDataFormProps extends ComponentProps<"form"> {
    schema: ZodObject<ZodRawShape>
    fields: InputGroup[]
    formKey: string
    title: string
    subtitle: string
    insertUrl: string
    insertQueryKey?: string
    updateQueryKey?: string
    updateUrl?: string
    redirect?: string
    method?: "insert" | "update"
    submitText: string
    afterInsertFunction?: Function
    columns: number
    body?: "application/json" | "FormData"
    defaultButton?: boolean
    successMessage?: string
    errorMessage?: string
    invalidateQueryKeys: string[]
    queryClient: QueryClient
}

type DataFormProps = {} & ComponentProps<"form"> &
    IDataFormProps &
    ({ body: "application/json" } | { body: "FormData"; files: string[] })

export const DataForm: FC<DataFormProps> = ({
    method = "insert",
    ...props
}) => {
    const [files, setFiles] = useState<File[]>([])
    const router = useRouter()
    const {
        fields,
        formKey,
        title,
        subtitle,
        insertUrl,
        schema,
        updateUrl,
        redirect = "/",
        insertQueryKey = ["new", formKey],
        updateQueryKey = ["update", formKey],
        submitText = "Submit",
        afterInsertFunction,
        columns = 1,
        body = "FormData",
        defaultButton = true,
        successMessage = "Muvaffaqqiyatli bajarildi! Iltimos biroz kuting!",
        errorMessage = "Xatolik! Iltimos formani to'g'ri to'ldirganligingizni tekshiring!",
        invalidateQueryKeys,
        queryClient,
    } = props
    const { toast } = useToast()
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ["new", insertQueryKey],
        mutationFn: async (data: z.infer<typeof schema>) => {
            // Object.entries(data).forEach((pair) => console.log(pair))
            // const mutationResponse = await makeMutation(insertUrl, data)
            // afterInsertFunction?.(mutationResponse)
            // console.log(mutationResponse)
        },
        onSuccess(data, variables, context) {
            toast({
                title: successMessage,
            })
            queryClient.invalidateQueries({
                queryKey: [...invalidateQueryKeys],
            })
            router.push(redirect!)
        },
        onError(error: any, variables, context) {
            console.log(error.response)
            toast({
                title: errorMessage,
            })
        },
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: "all",
    })
    const {
        field,
        fieldState: { invalid, isTouched, isDirty },
        formState: { touchedFields, dirtyFields },
    } = useController?.({
        name: props.fields.find((field) => field.type === "file")?.name! || "",
        control: form.control,
        rules: { required: true },
    })
    const { register, control } = form

    function onSubmit(values: z.infer<typeof schema>) {
        let res: unknown
        if (body === "application/json") res = mutate(values)
        else {
            // @ts-ignore
            const formData = objectToFormData(values, props.files)
            res = mutate(formData)
        }
    }
    useMemo(() => {
        if (!files) return
        form.setValue(
            props.fields.find((field) => field.type === "file")?.name!,
            (files[0] as any)?.file
        )
    }, [files])
    return (
        <Form {...form}>
            <div className="grid gap-4 mb-6">
                {title && (
                    <HeadingTwo className="text-2xl -ml-[5px] md:text-3xl lg:text-4xl xl:text-5xl">
                        {title}
                    </HeadingTwo>
                )}
                {subtitle && (
                    <Paragraph className="mt-0 text-sm lg:text-2xl">
                        {subtitle}
                    </Paragraph>
                )}
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    className={cn(
                        "grid  max-w-[450px] gap-4",
                        `grid-cols-${columns}`,
                        props.className
                    )}
                >
                    {fields.map((inputField) => (
                        <FormItem key={inputField.name}>
                            <FormLabel>{inputField.label}</FormLabel>
                            <FormControl>
                                {inputField.type === "file" ? (
                                    <ImageUploader
                                        onChange={field.onChange} // send value to hook form
                                        onBlur={field.onBlur} // notify when input is touched/blur
                                        value={field.value}
                                        files={files}
                                        setFiles={setFiles}
                                        className={cn(
                                            "space-y-0",
                                            inputField.className
                                        )}
                                        name={inputField.name!}
                                        {...inputField}
                                    />
                                ) : (
                                    <Input
                                        className={cn(
                                            "space-y-0",
                                            inputField.className
                                        )}
                                        {...register(inputField.name!)}
                                        {...inputField}
                                    />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ))}

                    {props.children}
                    {defaultButton && (
                        <Button variant="default" disabled={isPending}>
                            {submitText}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}
