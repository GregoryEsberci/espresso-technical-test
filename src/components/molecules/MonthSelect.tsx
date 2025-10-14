import { FormControl, MenuItem, Select, selectClasses } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import dayjs from 'dayjs';
import { capitalize, times } from 'lodash';

export const INITIAL_MONTH_SELECT_DATE = dayjs
  .utc('2025-07-01')
  .startOf('month')
  .toDate();

const MONTH_SELECT_OPTIONS = times(3).map((index) => {
  const date = dayjs.utc(INITIAL_MONTH_SELECT_DATE).add(index, 'months');

  return {
    value: date.valueOf(),
    label: capitalize(date.format('MMMM YYYY')),
  };
});

export function MonthSelect({ onChange, value, disabled }: MonthSelectProps) {
  return (
    <FormControl>
      <Select
        IconComponent={(props) => <ExpandMore {...props} fontSize="large" />}
        disabled={disabled}
        value={value.valueOf()}
        onChange={(event) => onChange(new Date(event.target.value))}
        displayEmpty
        sx={{
          borderRadius: 10,
          [`.${selectClasses.select}`]: { mr: 2 },
        }}
      >
        {MONTH_SELECT_OPTIONS.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

type MonthSelectProps = {
  value: Date;
  onChange: (value: Date) => void;
  disabled?: boolean;
};
