import { defineConfig } from 'vite';
import graphqlLoader from 'vite-plugin-graphql';

export default defineConfig({
  plugins: [graphqlLoader],
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json', '.gql'],
  },
});
