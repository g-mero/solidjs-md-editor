import antfu from '@antfu/eslint-config'

export default antfu({
  solid: true,
  rules: {
    'no-console': 'warn',
    // conflicts with auto-import
    'solid/jsx-no-undef': 'off',
    'solid/reactivity': ['warn', {
      // List of function names to consider as reactive functions (allow signals to be safely passed as arguments). In addition, any create* or use* functions are automatically included.
      customReactiveFunctions: ['watch'], // Array<string>
    }],
  },
  ignores: ['*.d.ts', '*.js'],
})
