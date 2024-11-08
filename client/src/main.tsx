import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import store from './store'
import App from './App'
import i18n from './i18n'

import '@/assets/scss/index.scss'
import '@/assets/scss/global.scss'
import '@/assets/scss/auth.scss'
import '@/assets/scss/error.scss'
import '@/assets/scss/not-found.scss'


createRoot( document.getElementById( 'root' )! )
  .render(
    <StrictMode>
      <Provider store={ store }>
        <BrowserRouter>
          <I18nextProvider i18n={ i18n }>
            <Suspense fallback={ <p>Loading...</p> }>
              <App />
            </Suspense>
          </I18nextProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  )
