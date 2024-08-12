import FullFilterWrapper from '../full-filter/full-filter-wrapper';
import SearchInput from './search-input';

const UsersSearch = () => {
  return (
    <div className="group flex w-fit items-center space-x-1 rounded-lg border border-[#C9D0E1] px-3">
      <SearchInput />
      <FullFilterWrapper />
    </div>
  );
};

export default UsersSearch;
