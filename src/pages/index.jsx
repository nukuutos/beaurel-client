import { useSelector } from 'react-redux';
import 'regenerator-runtime/runtime';
import Vk from '../components/base/icons/vk';
import useHandleRouting from '../components/layout/hooks/use-handle-routing';
import ActionSection from '../components/pages/landing/action-section';
import FeatureSection from '../components/pages/landing/feature-section/feature-section';
import useElementAppearence from '../components/pages/landing/feature-section/use-element-appearence';
import IntroSection from '../components/pages/landing/intro-section/intro-section';
import useDisableScroll from '../components/pages/landing/use-disable-scroll';

const Index = () => {
  const { isLoading } = useSelector((state) => state.routing);
  const { toggleScroll, landingScrollClassName } = useDisableScroll();
  const footerLogoRef = useElementAppearence({
    className: 'landing__footer-logo--visible',
    threshold: 1,
  });

  useHandleRouting();

  return (
    <div className="landing">
      <main className={`landing__main ${landingScrollClassName}`}>
        <IntroSection toggleScroll={toggleScroll} />
        <FeatureSection />
        <ActionSection />
        <footer className="landing__footer">
          <span ref={footerLogoRef} className="landing__footer-logo">
            Beaurel
            <a target="_blank" href="https://vk.com/beaurel" rel="noreferrer">
              <Vk className="landing__vk" />
            </a>
          </span>
          <span className="landing__rights">All rights reserved © 2022</span>
        </footer>
      </main>
      {isLoading && (
        <div className="landing__spinner">
          <div className="spinner-with-background spinner-with-background--inverse" />
        </div>
      )}
    </div>
  );
};
export default Index;
