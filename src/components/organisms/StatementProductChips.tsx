import { ShowChart, SvgIconComponent } from '@mui/icons-material';
import { Box, Chip } from '@mui/material';
import { StatementProductType } from '../../types/statement';
import {
  STATEMENT_PRODUCT_ICON,
  STATEMENT_PRODUCT_LABEL,
} from '../../utils/constants';

export function StatementProductChips({
  onSelect,
  selected,
}: StatementProductChipsProps) {
  return (
    <Box gap={2} display="flex">
      {PRODUCT_CHIPS.map(({ label, value, Icon }) => (
        <Chip
          sx={{ height: 50, padding: 1.5, borderRadius: 6 }}
          label={label}
          icon={<Icon />}
          variant={value === selected ? 'filled' : 'outlined'}
          key={value}
          clickable
          onClick={() => onSelect(value)}
        />
      ))}
    </Box>
  );
}

export type ProductChipValue = 'all' | StatementProductType;

type StatementProductChipsProps = {
  onSelect: (value: ProductChipValue) => void;
  selected: ProductChipValue;
};

type ChipType = {
  label: string;
  value: ProductChipValue;
  Icon: SvgIconComponent;
};

const PRODUCT_CHIPS: ChipType[] = [
  {
    label: 'Visão geral',
    Icon: ShowChart,
    value: 'all',
  },
  {
    label: STATEMENT_PRODUCT_LABEL.business_account,
    Icon: STATEMENT_PRODUCT_ICON.business_account,
    value: StatementProductType.BusinessAccount,
  },
  {
    label: STATEMENT_PRODUCT_LABEL.expense_management,
    Icon: STATEMENT_PRODUCT_ICON.expense_management,
    value: StatementProductType.ExpenseManagement,
  },
  {
    label: STATEMENT_PRODUCT_LABEL.suppliers,
    Icon: STATEMENT_PRODUCT_ICON.suppliers,
    value: StatementProductType.Suppliers,
  },
];
