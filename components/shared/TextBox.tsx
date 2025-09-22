import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface TextBoxProps {
  description?: any[]
  paragraphClasses?: string
}
export default function Header(props: TextBoxProps) {
  const { description, paragraphClasses } = props
  if (!description) {
    return null
  }
  return (
    <div className="my-6 lg:my-12 lg:px-16 2xl:px-24">
      {/* Description */}
      {description && (
        <div className="lg:text-center">
          <CustomPortableText value={description} paragraphClasses={paragraphClasses} />
        </div>
      )}
    </div>
  )
}
