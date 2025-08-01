import Switch from '../../baseUI/Switch';

const Section = ({title, children, ...props}) => {
    return <section className="pt-[30px] relative">
        <div className="flex items-center gap-5 px-10">
            <h2 className="font-semibold text-3xl">{title}</h2>
            <Switch {...props} /> {/* App.jsx'ten gelen tüm prop'lar buraya aktarılır. */}
        </div>
        <div className="pt-5">
            {children}
        </div>
    </section>
}

export default Section;