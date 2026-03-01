import './PageLayout.css'

function PageLayout({ icon, name, children}) {
  return (
    <section className='page-layout'>
        <div className="page-container">
            <div className="page-header__wrap">
                <div className="page-icon-wrap">
                    {icon}
                </div>
                <h2 className="page-name">
                    {name}
                </h2>
            </div>
            {children}
        </div>
    </section>
  )
}

export default PageLayout
