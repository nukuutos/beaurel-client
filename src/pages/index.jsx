import 'regenerator-runtime/runtime';
import ActionSection from '../components/pages/landing/action-section';
import FeatureSection from '../components/pages/landing/feature-section/feature-section';
import useElementAppearence from '../components/pages/landing/feature-section/use-element-appearence';
import IntroSection from '../components/pages/landing/intro-section/intro-section';
import useDisableScroll from '../components/pages/landing/useDisableScroll';

const Index = () => {
  const { toggleScroll, landingScrollClassName } = useDisableScroll();
  const footerLogoRef = useElementAppearence({
    className: 'landing__footer-logo--visible',
    threshold: 1,
  });

  return (
    <div className="landing">
      <main className={`landing__main ${landingScrollClassName}`}>
        <IntroSection toggleScroll={toggleScroll} />
        <FeatureSection />
        <ActionSection />
        <footer className="landing__footer">
          <span ref={footerLogoRef} className="landing__footer-logo">
            Beaurel
          </span>
        </footer>
      </main>
    </div>
  );
};
export default Index;
