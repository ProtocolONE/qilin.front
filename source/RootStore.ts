/**
 * Root store, that agragate high-level modules.
 * Every module have its own endpoint, that specified in routes
 */
export default {
    /**
     * Common state, getters, actions, mutations
     * are used for data, that all pages need.
     * @TODO (remove sentence)
     * It can be: some common analytics, authentication data, high-level error handling, etc
     */
    store: {},

    // Modules by root store
    modules: {},
};
