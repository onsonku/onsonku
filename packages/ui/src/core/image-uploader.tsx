import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { ComponentProps, FC } from "react"

interface Props extends Omit<ComponentProps<"input">, "ref"> {
    files: any
    setFiles: any
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const ImageUploader: FC<Props> = ({ files, setFiles, ...props }) => {
    return (
        <FilePond
            className="w-full rounded-md border border-input bg-[#F1F1F4] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#181618]"
            files={files}
            chunkSize={3000000}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            {...props}
        />
    )
}
