import TextBox from '@/components/shared/TextBox'

const Image = ({ data = {}, paragraphClasses }) => {
  const { description } = data
console.log('Image data:', paragraphClasses)
  if (!description) return null
  return (
    
    <div className="divider">
          <TextBox
            description={description}
            classesWrapper="relative"
            paragraphClasses={paragraphClasses}
          />
    </div>
  )
}

export default Image