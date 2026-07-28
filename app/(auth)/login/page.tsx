import { Suspense } from 'react'
import LoginFrom from '../_components/loginFrom'
import LoginForm from '../_components/loginFrom'

function page() {
  return (

    <Suspense fallback={
        <div className="py-12 text-center text-xs text-slate-400 animate-pulse">
          Loading Login form...
        </div>
      }>
        <LoginForm />
      </Suspense>

  )
}

export default page