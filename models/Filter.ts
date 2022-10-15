import { useState } from 'react';

export type FilterSetter = ReturnType<typeof useState<string>>[1];
