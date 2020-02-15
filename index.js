import gif from 'gulp-if';
import gplumber from 'gulp-plumber';
import gprint from 'gulp-print';
import lazypipe from 'lazypipe';

/**
 * @param predicate function as a pedicate to be evaluated in order to determing whether to mark it as changed or not-changed
 * @param path destination path string to file to determine the diff
 */
module.exports = (predicate, path) => {
  return lazypipe()
    .pipe(function () {
      return gif(_ => {
        if (typeof predicate === 'boolean') return predicate;
        else if (typeof predicate === 'function') return predicate(process.argv);  
      }, gchanged(path))
    })
    .pipe(() => gplumber())
    .pipe(() => gprint());
};