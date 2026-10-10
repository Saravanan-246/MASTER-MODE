import RichText from '../common/RichText.jsx'

// Keyword chips to drop into an answer, plus the recall lines as a quick list.
export default function QuickRevision({ keywords = [], remember = [] }) {
  const pairs = remember.filter((entry) => typeof entry === 'object')
  return (
    <div className="revision">
      {keywords.length > 0 && (
        <ul className="revision__keywords" aria-label="Important keywords">
          {keywords.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      )}
      {pairs.length > 0 && (
        <dl className="revision__pairs">
          {pairs.map((pair) => (
            <div key={pair.prompt}>
              <dt>
                <RichText text={pair.prompt} />
              </dt>
              <dd>
                <RichText text={pair.answer} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
