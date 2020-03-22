import { Heading } from '@components/display'

export default function IndexPage() {
  return (
    <React.Fragment>
      <Heading variant={Heading.h1}>Heading Level 1 Culpa ullamco dolore anim occaecat.</Heading>
      <Heading variant={Heading.h2}>Heading Level 2 Aute ad sint cillum pariatur aliqua ullamco adipisicing nulla.</Heading>
      <Heading variant={Heading.h3}>Heading Level 3 Aliqua occaecat officia nostrud commodo cupidatat incididunt.</Heading>
      <p><br /><br /></p>
      <p>Veniam enim non mollit eiusmod anim magna officia reprehenderit eiusmod aute minim culpa. Sunt consectetur quis aliqua dolor elit. Ex nisi aliqua commodo ullamco tempor. Labore non in occaecat elit dolor  e. Eu ut quis exercitation laboris deserunt aute ea ullamco sunt consectetur. Duis deserunt officia nulla in culpa amet duis ipsum officia.</p>
      <p><small><a href="#">Respond</a> / <a href="#">Run Away</a></small></p>
    </React.Fragment>
  )
}


IndexPage.getStaticProps = async () => ({
  props: {

  }
})

IndexPage.getStaticPaths = async () => ({
  paths: [
    { params: { } }
  ]
})
