import getClassName from './get-class-name';

const useSwitch = (currenTabState) => {
  const [currentTab, setCurrentTab] = currenTabState; // reorder, display

  const goToReorder = () => setCurrentTab('reorder');
  const goToDisplay = () => setCurrentTab('display');

  const displayClassName = getClassName(currentTab, 'display');
  const reorderClassName = getClassName(currentTab, 'reorder');

  const goTo = { goToReorder, goToDisplay };
  const classNames = { displayClassName, reorderClassName };

  return { goTo, classNames };

  // return [currentTab, <Switch goTo={goTo} classNames={classNames} />];
};

export default useSwitch;
