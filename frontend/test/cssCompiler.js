// fix for css import statements
// https://gist.github.com/daviferreira/1503ce0532abca270b86
require.extensions['.css'] = () => null;
require.extensions['.scss'] = () => null;
